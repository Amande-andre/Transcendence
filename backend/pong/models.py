from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class User(AbstractBaseUser):
	username = models.CharField(max_length=25, unique=True)

	USERNAME_FIELD = 'username'
	