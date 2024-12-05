from django.db import models
from users.models import User

# Create your models here.
class Match(models.Model):
    player1 = models.CharField(max_length=15)
    score1 = models.IntegerField()
    player2 = models.CharField(max_length=15)
    score2 = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dateTime = models.CharField(max_length=30)
    color = models.CharField(max_length=10)
