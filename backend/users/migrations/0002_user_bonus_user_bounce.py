# Generated by Django 5.1.1 on 2024-12-06 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bonus',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='bounce',
            field=models.IntegerField(default=0),
        ),
    ]
