import pygame
from config import config


class Player:
    """
    Play background music and stops it
    """

    def __init__(self):
        """
        Load the needed audiofile, starts playing in an infinity loop and pause it,
        """
        pygame.mixer.init()
        pygame.mixer.music.load(config["background_music"])
        pygame.mixer.music.play(loops=-1)
        pygame.mixer.music.set_volume(config["background_music_volume"])
        pygame.mixer.music.pause()

    def play(self):
        """
        Unpause the player
        """
        pygame.mixer.music.unpause()

    def stop(self):
        """
        Pause the player
        """
        pygame.mixer.music.pause()

    def end(self):
        """
        Stop music completely
        """
        pygame.mixer.music.stop()
