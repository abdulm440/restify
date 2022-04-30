from django.db import models
from django.db.models import SET_NULL
from django.conf import settings


class restaurant(models.Model):
    name = models.CharField(max_length=2000, null=False, blank=False)
    address = models.CharField(max_length=3000, null=False, blank=False)
    postalCode = models.CharField(max_length=30, null=False, blank=False)
    phoneNumber = models.CharField(max_length=30, null=False, blank=False)
    description = models.CharField(max_length=10000)
    logo = models.ImageField()
    owner = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, null=True)
    type = models.CharField(max_length=8, choices=[("IN", "INDIAN"), ("IT", "ITALIAN"), ("AM", "AMERICAN"), ("PI", "PIZZA"), ("CH", "CHINESE")])
    def __str__(self):
        return self.name
