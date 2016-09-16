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
        pygame.mixer.init(48000, -16, 1, 1024)
        self.channel=pygame.mixer.Channel(2)
        music = pygame.mixer.Sound(config["background_music"])
        music.set_volume(config["background_music_volume"])
        self.channel.play(music, loops=-1, fade_ms=300)
        self.channel.set_volume(config["background_music_volume"])
        self.channel.pause()

    def play(self):
        """
        Unpause the player
        """
        self.channel.unpause()

    def stop(self):
        """
        Pause the player
        """
        self.channel.pause()

    def end(self):
        """
        Stop music completely
        """
        self.channel.stop()

    def mute(self):
        self.channel.set_volume(0)

    def unmute(self):
        self.channel.set_volume(config["background_music_volume"])
