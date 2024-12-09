from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    profilePhoto = models.ImageField(upload_to='profilePhoto/', null=True, blank=True)
    friends = models.ManyToManyField("self", blank=True)

    isOnline = models.BooleanField(default=False)
    
    username = models.CharField(max_length=15, unique=True)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    gamePlayed = models.IntegerField(default=0)
    bounce = models.IntegerField(default=0)
    bonus = models.IntegerField(default=0)
    score = models.IntegerField(default=0)

    class Meta:
        pass