# Generated by Django 4.0.3 on 2022-03-14 19:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_alter_restaurant_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='restaurant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restaurant.restaurant'),
        ),
    ]
