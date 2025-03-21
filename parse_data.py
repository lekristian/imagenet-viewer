import os
import psycopg2
import xml.etree.ElementTree as ET

# -----------------------------------------------------------------------------
# Configuration via environment variables or defaults
# -----------------------------------------------------------------------------
DB_NAME = os.getenv('POSTGRES_DB', 'my_db')
DB_USER = os.getenv('POSTGRES_USER', 'my_user')
DB_PASS = os.getenv('POSTGRES_PASSWORD', 'my_password')
DB_HOST = os.getenv('DB_HOST', 'db')
DB_PORT = os.getenv('DB_PORT', '5432')

XML_FILE = os.getenv('XML_FILE', 'imagenet.xml')


def create_table_if_not_exists(conn):
    """
    Creates the imagenet_hierarchy table if it does not already exist.
    """
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS imagenet_hierarchy (
        id           SERIAL PRIMARY KEY,
        parent_fk_id INT REFERENCES imagenet_hierarchy(id) NULL,
        wnid         TEXT,
        name         TEXT NOT NULL,
        size         INT  NOT NULL DEFAULT 0
    );
    """
    with conn.cursor() as cursor:
        cursor.execute(create_table_sql)
    conn.commit()

    
def count_descendants(node):
    """Recursively count all descendant <synset> elements."""
    children = node.findall('synset')
    # Count all direct children and recursively count their descendants
    return len(children) + sum(count_descendants(child) for child in children)


## moja prva verzia ktora necita data po batchoch
# def store_synset(conn, node, parent_id=None):
#     """
#     Recursively insert a <synset> element into the DB.
    
#     :param conn:       open psycopg2 connection
#     :param node:       the <synset> Element
#     :param parent_id:  the PK of the parent's DB row (None if top-level)
#     :return:           the newly inserted record's id
#     """
#     words = node.attrib.get('words', '')  # e.g. "planktonic algae"
#     wnid  = node.attrib.get('wnid', '')   # e.g. "n01384084"
    
    
#     # Calculate the total number of descendant synsets
#     size = count_descendants(node)
    
#     # Insert row
#     insert_sql = """
#         INSERT INTO imagenet_hierarchy (parent_fk_id, wnid, name, size)
#         VALUES (%s, %s, %s, %s)
#         RETURNING id
#     """
#     with conn.cursor() as cursor:
#         cursor.execute(insert_sql, (parent_id, wnid, words, size))
#         new_id = cursor.fetchone()[0]
#     conn.commit()
    
#     # Recurse over child synsets
#     for child in node.findall('synset'):
#         store_synset(conn, child, parent_id=new_id)
    
#     return new_id

def store_synset(conn, node, parent_id=None, batch_size=100):
    """
    Recursively insert a <synset> element into the DB in batches.
    """
    batch = []

    def process_batch(conn, batch):
        """Helper to process a batch of insert statements."""
        if not batch:
            return []
        insert_sql = """
            INSERT INTO imagenet_hierarchy (parent_fk_id, wnid, name, size)
            VALUES {}
            RETURNING id
        """
        with conn.cursor() as cursor:
            args_str = ",".join(cursor.mogrify("(%s, %s, %s, %s)", x).decode("utf-8") for x in batch)
            cursor.execute(insert_sql.format(args_str))
            ids = cursor.fetchall()
        conn.commit()
        return [id[0] for id in ids]

    # Add the current node to the batch
    batch.append((parent_id, node.attrib.get('wnid', ''), node.attrib.get('words', ''), count_descendants(node)))

    children = node.findall('synset')

    # Process current batch if it reaches the specified batch_size
    if len(batch) >= batch_size:
        new_ids = process_batch(conn, batch)
        batch.clear()  # clear the batch after processing

        # Recursively process each child with the correct parent_id
        for new_id, child in zip(new_ids, children):
            store_synset(conn, child, parent_id=new_id, batch_size=batch_size)
    else:
        new_id = process_batch(conn, batch)[-1]
        for child in children:
            store_synset(conn, child, parent_id=new_id, batch_size=batch_size)


def main():
    # 1. Connect to PostgreSQL
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT
    )

    # 2. Ensure table exists
    create_table_if_not_exists(conn)

    # 3. Parse the XML
    tree = ET.parse(XML_FILE)
    root = tree.getroot()  # <ImageNetStructure> expected as root

    # 4. Insert top-level synsets
    inserted_count = 0
    for top_synset in root.findall('synset'):
        store_synset(conn, top_synset, parent_id=None)
        inserted_count += 1

    conn.close()
    print(f"Inserted top-level {inserted_count} synsets (plus their children).")


if __name__ == "__main__":
    main()
