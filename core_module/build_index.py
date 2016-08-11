import os
import urllib2
import json
import sys
sys.path.append("../")
from configure import ConstExtractor
_settings = ConstExtractor()


def indexFile(fname):
    """Adds a single file to index."""
    print '\nIndexing ' + fname
    createEncodedTempFile(fname)

    cmd = 'curl -X POST "{}/{}/{}/{}" -d @'.format(
        _settings.getValue("elastic_host"), _settings.getValue("elastic_index"), _settings.getValue("elastic_type"), fname.split('/')[-1].rsplit('.', 1)[0]) + _settings.getValue("elastic_tmp_file_name")
    print cmd
    os.system(cmd)

    os.remove(_settings.getValue("elastic_tmp_file_name"))
    print '\n---------------------'


def indexDir(dir):
    """Adds all files in directory to index. You can specify 
    what formats will be added to index. To do this change INDEX_FILE_TYPES in config file."""
    print 'Indexing dir ' + dir

    createIndexIfDoesntExist()

    for path, dirs, files in os.walk(dir):
        for file in files:
            fname = os.path.join(path, file)
            base, extension = file.rsplit('.', 1)
            if extension.lower() in _settings.getValue("elastic_index_file_types"):
                indexFile(fname)


def createEncodedTempFile(fname):
    """Creates temporary JSON file in which your file will be stored. """
    file64 = open(fname, "rb").read().encode("base64")
    print 'writing JSON with base64 encoded file to temp file {}'.format(_settings.getValue("elastic_tmp_file_name"))

    f = open(_settings.getValue("elastic_tmp_file_name"), 'w')
    data = {'file': file64, 'title': fname}
    json.dump(data, f)  # dump json to tmp file
    f.close()


def createIndexIfDoesntExist():
    """Checks if Index exists. If not, creates new."""
    class HeadRequest(urllib2.Request):
        def get_method(self):
            return "HEAD"

    os.system('curl -X DELETE {}/{}'.format(_settings.getValue("elastic_host"),
                                            _settings.getValue("elastic_index")))
    # check if index exists by sending HEAD request to index
    try:
        urllib2.urlopen(HeadRequest(_settings.getValue(
            "elastic_host") + '/' + _settings.getValue("elastic_index")))
    except urllib2.HTTPError, e:
        if e.code == 404:

            print 'Index doesnt exist, creating...'
            os.system('curl -X PUT {}/{}'.format(_settings.getValue("elastic_host"),
                                                 _settings.getValue("elastic_index")))
            os.system('curl -X PUT {}/{}/{}/_mapping -d'.format(_settings.getValue("elastic_host"), _settings.getValue("elastic_index"), _settings.getValue("elastic_type")) + """ '{
                          "%s": {
                            "properties": {
                              "file": {
                                "type": "attachment",
                                "fields": {
                                  "content_type": {
                                    "type": "string",
                                    "term_vector":"with_positions_offsets",
                                    "store": true
                                  },
                                  "title": {
                                    "type":"string"
                                  }
                                }
                              }
                            }
                          }
                        }' """ % (_settings.getValue("elastic_type")))
        else:
            print 'Failed to retrieve index with error code - %s.' % e.code

if __name__ == '__main__':
    indexDir(_settings.getValue("elastic_dir"))
