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
    "flask_server_speaking_address": "/screens/speaking",
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
        "VOLUME_UP": ['volume up', 'increase volume', 'turn up the volume'],
        "VOLUME_DOWN": ['volume down', 'decrease volume', 'turn the volume down', 'reduce the volume'],
        "START": ['ok arius', 'what is that', 'what the fuck'],
        "DETAILED_DATA": ['show more'],
        "MUTE": ['mute', 'shut up'],
        "UNMUTE": ['unmute', 'make it louder', 'turn sound on'],
        "CONTINIOUS_SCROLL_DOWN" : ['start scrolling down'],
        "CONTINIOUS_SCROLL_UP": ['start scrolling up'],
        "STOP_SCROLL" : ['stop scrolling']
    },
    "core_update_interval": 0.1,

    "output_server_host": "127.0.0.1",
    "output_server_port": "5000",
    "output_server_url": "/output",
    "output_server_home": "server/static/local_pages/pdf.js/web/",
    "output_data_pdf_viewer": "server/static/local_pages/pdf.js/web/viewer.html",
    "output_header_height": .1,
    "output_footer_height": .4,
    "output_browser_top_page": "/screens/black",
    "output_browser_bottom_page": "/screens/black",
    "output_update_frequency": 200,
    "output_user_agent": "Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7",

    "voice_command_output": {
        "CANCEL": ["Operation cancelled.", "See you.", "Have a nice day.", "See you soon."],
        "ZOOM_IN": ["Enlarging.", "Ok man."],
        "ZOOM_OUT": ["Zooming out.", "Will be done."],
        "SCROLL_DOWN": ["Down.", "Ok, my lord.", "Ok man."],
        "SCROLL_UP": ["Up.", "Moving up.", "Yes sir.", "Ok man."],
        "SEARCH_BEGAN": ["Search request accepted. My lord.", "Request accepted.", "Looking for relevant information.", "Yes sir."],
        "DISPLAY_VIDEO": ['Take a look please.', 'Found a video.', 'Let me show you.'],
        "STOP_SCROLL" : ['Done.', 'I am designed to serve you.', 'Ok man.']
    },

    "elastic_host": "http://localhost:9200",
    "elastic_index": "arius",
    "elastic_type": "doc",
    "elastic_docs_dir": "server/static/local_pages/",
    "elastic_index_file_types": [".html", ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".url"],

    "marytts_host": "localhost",
    "marytts_port": "59125",

    "default_voice": "marytts_voice1",
    "marytts_voice1": {"INPUT_TYPE": "TEXT", "LOCALE": "en_US", "VOICE": "cmu-slt-hsmm", "OUTPUT_TYPE": "AUDIO", "AUDIO": "WAVE", 
                        "effect_FIRFilter_selected": "on", "effect_FIRFilter_parameters": "type:2;fc1:500.0;fc2:2000.0",
                        "effect_F0Add_selected": "on", "effect_F0Add_parameters": "f0Add:65.0;"},
    "marytts_voice1_volume": 1.0,
    "marytts_voice2": {"INPUT_TYPE": "TEXT", "LOCALE": "en_US", "VOICE": "cmu-slt-hsmm", "OUTPUT_TYPE": "AUDIO", "AUDIO": "WAVE", 
                        "effect_F0Add_selected": "on", "effect_F0Add_parameters": "f0Add:65.0;"},
    "marytts_voice2_volume": 1.0,
    "marytts_voice3": {"INPUT_TYPE": "TEXT", "LOCALE": "en_US", "VOICE": "cmu-slt-hsmm", "OUTPUT_TYPE": "AUDIO", "AUDIO": "WAVE", 
                        "effect_FIRFilter_selected": "on", "effect_FIRFilter_parameters": "type:2;fc1:500.0;fc2:2000.0"},
    "marytts_voice3_volume": 1.0,

    "background_music": "organ_background.wav",
    "background_music_volume": 0.2,

    "animated_images": ['mylko.gif', '1.gif', '2.gif', '3.gif', '4.gif', '5.gif', '6.gif', 
                        '7.gif', '8.gif', '9.gif', '10.gif', '11.gif'],
    
    "predefined_videos": {
        "austin_ss_ux_ui": ["austin", "texas", "headquarter", "ux/ui"],
        "barista_coffe": ["coffe", "smart home"],
        "beer_recognizer": ["computer vision", "object recognition", "beer"],
        "human_accelerator_ss": ["healthcare", "human accelerator"],
        "mylko_byod": ["bring your own device", "apple watch", "byod"],
        "mylko_cool_thing": ["internet of things", "take the cloud to the ground", "iot"],
        "SaaS_offer_ss": ["software as a service", "software service", "SaaS"],
        "security_ss": ["security", "information privacy"],
        "lol": ["techical communication", "documentation"]
    }
}

config["flask_server_home"] = 'http://' + config['flask_server_address'] + \
    ':' + config['flask_server_port']
config["database_file"] = config["root_dir"] + "server/static/tag_data.json"
