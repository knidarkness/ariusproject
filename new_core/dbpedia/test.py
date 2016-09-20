from qa_module import get_abstract


class QAConnector:
    def __init__(self):
        pass

    def get_abstact(self, question):
        return get_abstract(question)

if __name__ == '__main__':
    c = QAConnector()
    print c.get_abstact('who is Bill Gates')
