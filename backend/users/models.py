from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    profilePhoto = models.ImageField(upload_to='profilePhoto/', null=True, blank=True)
    
    class Meta:
        pass

