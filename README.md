# About the Project:

## Problem : Question Answering for the Medical Images 
- [Data](https://www.nature.com/articles/sdata2018251)
- [Stacked Attention Network](https://arxiv.org/pdf/1511.02274.pdf)
- [Slides for Stacked Attention Network](http://www.cs.virginia.edu/~vicente/vislang/slides/wasimonica.pdf)

Implementation: I have taken inspiration from [Stacked Attention Network](https://arxiv.org/pdf/1511.02274.pdf), and the slides as mentioned above, and implemented in Tensorflow 2.0, however, I have made some changes, because I did not understand those things, will improve in the near future.


## Setup: 

GOOGLE COLAB:
What you need to do is: 

#### Download : 

        1. trainset.json
        2. testset.json
        3. VQA Image Folder
        4. Cache Folder  (contains the pickle file, for converting the answers to labels, and vice versa, and the mapping for dictionary and answer)
Upload these projects to your google drive, and then follow the instructions that are present in the VQA.ipynb notebook.

## Architecture
![alt text](https://github.com/haidera123/VQA-Disease-Detection/blob/Code/images/Architecture.png?raw=true)

## Results:
![alt text](https://raw.githubusercontent.com/haidera123/VQA-Disease-Detection/Code/images/model%20performance.png?raw=true)
![alt text](https://raw.githubusercontent.com/haidera123/VQA-Disease-Detection/Code/images/acc_loss_val.png?raw=true)

## Examples:
![alt text](https://raw.githubusercontent.com/haidera123/VQA-Disease-Detection/Code/images/results.png?raw=true)

