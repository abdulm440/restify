# Generated by Django 4.0.3 on 2022-03-14 17:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='menuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=30)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('type', models.CharField(choices=[('BV', 'BEVERAGE'), ('AP', 'APPETIZERS'), ('FD', 'FEATURED DISHES'), ('RD', 'REGULAR DISHES')], max_length=15)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurant.restaurant')),
            ],
        ),
    ]
