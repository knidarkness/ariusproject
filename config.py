import os
config = {
    "root_dir": os.path.dirname(os.path.abspath(__file__)) + "/",
    "flask_server_address": "127.0.0.1",
    "flask_server_port": "5000",

    "flask_server_input_client": "/input",
    "flask_server_core_input_connection": "/core/input",
    "flask_server_core_output_connection": "/core/output",
    "flask_server_output_client": "/output",
    "flask_server_output_noise": "/output/noise",
    "flask_server_input_noise": "/input/noise",

    "flask_server_idle_address": "/screens/idle",
    "flask_server_error_address": "/screens/error",
    "flask_server_search_address": "/screens/search",

    "arius_screen_idle_background": "#000",
    "arius_screen_search_background": "#000",
    "arius_screen_error_background": "#000",

    "core_server_input_address": "127.0.0.1",
    "core_server_input_port": "5000",
    "core_server_input_url": "/core/input",

    "core_server_output_address": "127.0.0.1",
    "core_server_output_port": "5000",
    "core_server_output_url": "/core/output",

    "core_command_recog_confidence": 0.7,
    "core_commands": {
        "ZOOM_IN": ['zoom in', 'increase', 'enlarge', 'zoom more'],
        "ZOOM_OUT": ['shrink', 'decrease', 'zoom less', 'zoom out'],
        "NO_ZOOM": ['normal size', 'zero zoom', 'no zoom', 'zoom reset', 'reset zoom'],
        "SCROLL_DOWN": ['page down', 'scroll down'],
        "SCROLL_UP": ['page up', 'scroll up'],
        "CANCEL": ['cancel', 'bye', 'thanks'],
        "WAIT": ['wait'],
        "START": ['ok arius', 'what is that', 'what the fuck']
    },
    "core_update_interval": 0.1,

    "output_server_host": "127.0.0.1",
    "output_server_port": "5000",
    "output_server_url": "/output",
    "output_server_home": "output_module/pdf.js/web/",
    "output_data_pdf_viewer": "output_module/pdf.js/web/viewer.html",
    "output_videoplayer_path": "output_module/pdf.js/web/videoplayer.html",
    "output_header_height": .15,
    "output_footer_height": .1,
    "output_browser_top_page": "http://google.com",
    "output_browser_bottom_page": "http://geektimes.ru",
    "output_update_frequency": .1,

    "elastic_host": "http://localhost:9200",
    "elastic_index": "arius",
    "elastic_type": "doc",
    "elastic_docs_dir": "data/",
    "elastic_index_file_types": [".html", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".url"],

    "marytts_host": "localhost",
    "marytts_port": "59125",

    "default_voice": "marytts_voice1",
    "marytts_voice1": {"INPUT_TYPE": "TEXT", "LOCALE": "en_US", "VOICE": "cmu-slt-hsmm", "OUTPUT_TYPE": "AUDIO", "AUDIO": "WAVE", "effect_FIRFilter_selected": "on", "effect_FIRFilter_parameters": "type:2;fc1:500.0;fc2:2000.0"},
    "marytts_voice2": "empty",
    "marytts_voice3": "empty",
    
    "predefined_videos" : {
        "austin_ss_ux_ui": ["austin", "texas", "headquarter", "ux/ui"],
        "barista_coffe": ["coffe", "smart home"],
        "beer_recognizer": ["computer vision", "object recognition", "beer"],
        "human_accelerator_ss": ["healthcare", "human accelerator"],
        "mylko_byod": ["bring your own device", "apple watch", "byod"],
        "mylko_cool_thing": ["internet of things", "take the cloud to the ground", "iot"],
        "SaaS_offer_ss": ["software as a service", "software service", "SaaS"],
        "security_ss": ["security", "information privacy"],
        "tc_ss": ["techical communication", "documentation"]
    }
	
    
}
