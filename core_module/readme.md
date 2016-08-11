#Installation Elasticsearch
Elasticsearch requires at least Java 7. 
Let’s download the Elasticsearch 2.3.5 tar as follows:
```
curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.3.5/elasticsearch-2.3.5.tar.gz
```
Then extract it as follows:
```
tar -xvf elasticsearch-2.3.5.tar.gz
```

Also, you need to install plugin for indexing PPT's and PDF's. (For more info about usage of this plugin please check [this](https://www.elastic.co/guide/en/elasticsearch/plugins/current/mapper-attachments-usage.html) and [this](https://hustbill.wordpress.com/2015/09/11/full-text-search-by-elasticsearch-mapper-attachments-in-pdf-format/))

This can be done by running this commands:
```
cd elasticsearch-2.3.5
sudo bin/plugin install mapper-attachments
```
Then you should install python module for ElasticSearch  
'''
pip install elasticsearch
'''
To launch a server run this .sh file:
```
cd bin
./elasticsearch
```

#USAGE
Use build_index.py for creating an index. You need to put all documents that you want to add to index in "docs" directory. Don't forget to launch ElasticSearch server before it.

That's all. Now you can search in index. 
