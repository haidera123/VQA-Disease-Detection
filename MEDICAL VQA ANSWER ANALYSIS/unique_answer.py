import json

file_path = './trainset_chest.json'  # Replace 'your_file.json' with the actual path to your JSON file

with open(file_path, 'r') as file:
    data = json.load(file)
    answers = [entry['qid'] for entry in data]
    unique_answers = set(answers)
    unique_answer_count = len(unique_answers)

print(f"Length of unique values for key 'answer': {unique_answer_count}")
