# Generated by Django 5.1.1 on 2024-11-29 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_friends_user_profilephoto_alter_user_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isOnline',
            field=models.BooleanField(default=False),
        ),
    ]