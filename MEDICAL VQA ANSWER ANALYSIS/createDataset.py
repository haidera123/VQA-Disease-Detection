import json

# Replace 'file.json' with the actual path to your JSON file
file_path = './trainset.json'

with open(file_path, 'r') as file:
    data = json.load(file)
    new_data = []
    index = 1
    for entry in data:
        if entry['answer_type'] == 'OPEN':
            new_entry = {
                "qid": index,
                "image_name": entry['image_name'],
                "image_organ": entry['image_organ'],
                "answer": entry['answer'],
                "answer_type": entry['answer_type'],
                "question_type": entry['question_type'],
                "question": entry['question'],
                "phrase_type": entry['phrase_type']
            }
            index += 1
            new_data.append(new_entry)

new_json_data = json.dumps(new_data)

new_file_path = 'trainset_open.json'

# Open the file in write mode
with open(new_file_path, 'w') as file:
    file.write(new_json_data)
