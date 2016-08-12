from PyQt5 import QtCore
from PyQt5 import QtGui
from PyQt5 import QtNetwork
from PyQt5 import QtWebKit
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWidgets import QApplication, QGridLayout, QWidget
from PyQt5 import QtWebKitWidgets
from PyQt5.QtCore import QUrl, QEventLoop, QTimer


class PDFViewer(QWebView):
    pdf_viewer_page = 'Vision.pdf'

    def __init__(self, parent=None):
        super(QWebView, self).__init__(parent)
        self.settings = QtWebKit.QWebSettings.globalSettings()
        self.settings.setAttribute(QtWebKit.QWebSettings.LocalContentCanAccessFileUrls, True)
        self.settings.setAttribute(QtWebKit.QWebSettings.LocalContentCanAccessRemoteUrls, True)
        self.settings.setAttribute(QtWebKit.QWebSettings.DeveloperExtrasEnabled, True)
        self.settings.setAttribute(QtWebKit.QWebSettings.PluginsEnabled, True)
        nam = QtNetwork.QNetworkAccessManager()
        page = QtWebKitWidgets.QWebPage(self)
        page.setNetworkAccessManager(nam)
        self.setPage(page)
        self.loadFinished.connect(self.onLoadFinish)
        print 'preload'
        self.setUrl(QtCore.QUrl(self.pdf_viewer_page))

    def onLoadFinish(self, success):
        if success:
            self.page().mainFrame().evaluateJavaScript("init();")
            print 'loaded'
        print 'not success'


if __name__ == '__main__':
    import sys
    app = QApplication(sys.argv)
    layout = QGridLayout()
    viewer = PDFViewer(parent=None)
    # layout.addItem(viewer, 1, 0)
    # frame = QWidget()
    # frame.setLayout(layout)
    # frame.show()
    viewer.show()

    # viewer.load(QUrl("file:///home/sdubovyk/Projects/arius%20%28copy%29/elastic_search_client/docs/Vision.pdf"))

    print 'showing'
    sys.exit(app.exec_())
