import os
import re
import json

def parse_markdown_structure(md_content):
    """
    Parse the markdown content and extract labeled structural elements:
    headers, chapters, sections, subsections, paragraphs, lists.
    Returns a list of dicts with element type and content.
    """
    lines = md_content.splitlines()
    labeled_data = []
    current_slide = None
    buffer = []

    def flush_buffer():
        nonlocal buffer
        if buffer:
            paragraph = "\\n".join(buffer).strip()
            if paragraph:
                labeled_data.append({"type": "paragraph", "content": paragraph})
            buffer = []

    for line in lines:
        line = line.rstrip()
        if line.strip() == "---":
            flush_buffer()
            labeled_data.append({"type": "slide_break"})
            current_slide = None
            continue
        header_match = re.match(r"^(#{1,6})\s+(.*)", line)
        if header_match:
            flush_buffer()
            level = len(header_match.group(1))
            text = header_match.group(2).strip()
            if level == 1:
                labeled_data.append({"type": "title", "content": text})
            elif level == 2:
                labeled_data.append({"type": "chapter", "content": text})
            elif level == 3:
                labeled_data.append({"type": "section", "content": text})
            elif level == 4:
                labeled_data.append({"type": "subsection", "content": text})
            else:
                labeled_data.append({"type": f"header_level_{level}", "content": text})
        elif re.match(r"^[-*]\s+.+", line):
            flush_buffer()
            # list item
            labeled_data.append({"type": "list_item", "content": line.strip()})
        elif re.match(r"^\|.*\|", line):
            flush_buffer()
            # table line
            labeled_data.append({"type": "table_line", "content": line.strip()})
        elif line.strip() == "":
            flush_buffer()
        else:
            buffer.append(line)
    flush_buffer()
    return labeled_data

def save_labeled_data(labeled_data, output_path):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(labeled_data, f, ensure_ascii=False, indent=2)

def main():
    input_md = "dataset/structure de rapport de stage.md"
    output_json = "dataset/structure_de_rapport_labeled.json"

    if not os.path.exists(input_md):
        print(f"Input file {input_md} not found.")
        return

    with open(input_md, "r", encoding="utf-8") as f:
        md_content = f.read()

    labeled_data = parse_markdown_structure(md_content)
    save_labeled_data(labeled_data, output_json)
    print(f"Labeled data saved to {output_json}")

if __name__ == "__main__":
    main()
