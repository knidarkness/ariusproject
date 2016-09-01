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
    "flask_server_black_address": "/screens/black",
    "flask_server_video_addr": "/video/<string:video_id>",
    "flask_server_video_addr_client": "/video/",
    "flask_server_local_page": "/page/<path:page_path>",
    "flask_server_local_page_client": "/page/",

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
        "PAUSE": ['pause'],
        "PLAY": ['play'],
        "START": ['ok arius', 'what is that', 'what the fuck']
    },
    "core_update_interval": 0.1,

    "output_server_host": "127.0.0.1",
    "output_server_port": "5000",
    "output_server_url": "/output",
    "output_server_home": "output_module/pdf.js/web/",
    "output_data_pdf_viewer": "output_module/pdf.js/web/viewer.html",
    "output_header_height": .1,
    "output_footer_height": .4,
    "output_browser_top_page": "/screens/black",
    "output_browser_bottom_page": "/screens/black",
    "output_update_frequency": 200,
    "output_user_agent": "Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7",

    "voice_command_output": {
        "CANCEL": "Operation cancelled",
        "ZOOM_IN": "Enlarging",
        "ZOOM_OUT": "Zooming out",
        "SCROLL_DOWN": "Down",
        "SCROLL_UP": "Up",
        "SEARCH_BEGAN": "Search request accepted, my lord"
    },

    "elastic_host": "http://localhost:9200",
    "elastic_index": "arius",
    "elastic_type": "doc",
    "elastic_docs_dir": "server/static/local_pages/",
    "elastic_index_file_types": [".html", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".url"],

    "marytts_host": "localhost",
    "marytts_port": "59125",

    "default_voice": "marytts_voice1",
    "marytts_voice1": {"INPUT_TYPE": "TEXT", "LOCALE": "en_US", "VOICE": "cmu-slt-hsmm", "OUTPUT_TYPE": "AUDIO", "AUDIO": "WAVE", "effect_FIRFilter_selected": "on", "effect_FIRFilter_parameters": "type:2;fc1:500.0;fc2:2000.0"},
    "marytts_voice1_volume": 1.0,
    "marytts_voice2": "empty",
    "marytts_voice2_volume": 1.0,
    "marytts_voice3": "empty",
    "marytts_voice3_volume": 1.0,

    "background_music": "organ_background.wav",
    "background_music_volume": 0.2,

    "predefined_videos": {
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

config["flask_server_home"] = 'http://' + config['flask_server_address'] + \
    ':' + config['flask_server_port']
