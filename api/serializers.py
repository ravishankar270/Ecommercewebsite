from rest_framework import serializers
from .models import Customer,Product,Cart
from rest_framework.response import Response

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__'
    
class CustomerRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model=Customer
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }
    def create(self,data):
        print(data)
        user=Customer(
            email=data['email'],
            Name=data['Name']

        )
        user.set_password(data['password'])
        user.save()
        
        