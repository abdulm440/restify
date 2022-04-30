from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from user.models import CustomUser as User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','password','first_name', 'last_name', 'avatar', 'phone_number')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'],     password = validated_data['password']  ,first_name=validated_data['first_name'],  last_name=validated_data['last_name'], phone_number=validated_data['phone_number'], avatar=validated_data['avatar'])
        return user

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password','first_name', 'last_name', 'avatar', 'phone_number')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'],     password = validated_data['password']  ,first_name=validated_data['first_name'],  last_name=validated_data['last_name'], phone_number=validated_data['phone_number'], avatar=validated_data['avatar'])
        return user
    
    def update(self, instance, validated_data):
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('created', instance.last_name)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.phone_number = validated_data.get('created', instance.phone_number)

        if(validated_data.get('password')):
            instance.set_password(validated_data.get('password'))
        instance.save()
        return instance

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'