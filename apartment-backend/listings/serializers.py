from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Apartment, Comment

class ApartmentSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)

    class Meta:
        model = Apartment
        fields = '__all__'
        read_only_fields = ['owner', 'owner_username']

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'apartment', 'username', 'text']
        read_only_fields = ['user', 'username']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered. Please log in or use forgot password.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
