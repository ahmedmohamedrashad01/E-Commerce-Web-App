from dataclasses import fields
from rest_framework import serializers
from commerce.models import Product, Orders, ShippingAddress

from accounts.serializers import UserCreateserializer

class ProductSerializers(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","description","category","price","image","is_active"]


class OrdersSerializers(serializers.ModelSerializer):
    # customer = UserCreateserializer()

    class Meta:
        model = Orders
        fields = ["id","customer","product","date_ordered","complete","qty"]
        read_only_fields = ['id']


    def to_representation(self, instance):
            data = super().to_representation(instance)
            data["product"] = ProductSerializers(instance.product).data
            return data





class ShippingAddressSerializers(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ["id","order","address","city","state"]