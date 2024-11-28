from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    profilePhoto = models.ImageField(upload_to='profilePhoto/', null=True, blank=True)
    friends = models.ManyToManyField("self", blank=True)
    
    username = models.CharField(max_length=15, unique=True)
    class Meta:
        pass

class Match(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    player1 = models.CharField(max_length=100)
    player2 = models.CharField(max_length=100)
    score1 = models.IntegerField()
    score2 = models.IntegerField()