import json
import os

def convert_labeled_json_to_training_format(input_json_path, output_txt_path):
    """
    Convert labeled JSON data into a simple token-level training format.
    Each line contains a token and its label separated by a space.
    Sentences are separated by a blank line.
    """
    with open(input_json_path, "r", encoding="utf-8") as f:
        labeled_data = json.load(f)

    with open(output_txt_path, "w", encoding="utf-8") as out_file:
        for item in labeled_data:
            label = item.get("type", "O").upper()
            content = item.get("content", "")
            if label == "SLIDE_BREAK":
                # Sentence boundary
                out_file.write("\n")
                continue
            # Split content into tokens (simple whitespace tokenizer)
            tokens = content.split()
            for token in tokens:
                out_file.write(f"{token} {label}\n")
            out_file.write("\n")  # Sentence boundary

def main():
    input_json = "dataset/structure_de_rapport_labeled.json"
    output_txt = "dataset/training_data.txt"

    if not os.path.exists(input_json):
        print(f"Input file {input_json} not found.")
        return

    convert_labeled_json_to_training_format(input_json, output_txt)
    print(f"Training data saved to {output_txt}")

if __name__ == "__main__":
    main()
