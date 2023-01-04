from django.shortcuts import render
from rest_framework import viewsets, filters
from commerce.models import Product, Orders, ShippingAddress
from commerce.serializers import ProductSerializers, OrdersSerializers, ShippingAddressSerializers
# from rest_framework.authentication import TokenAuthentication

# import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters


from accounts.models import UserAccount
from accounts.serializers import UserCreateserializer

# Create your views here.
class ProductViewSets(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name','category']
    search_fields = ['name']


class OrdersViewSets(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializers
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['customer__email']
    search_fields = ['customer__email']




class ShippingViewSets(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializers



class UserAccountViewSets(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateserializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['email']
    search_fields = ['email']




# ______________________Send Email_________________________________
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse

# def send(request):
#     res =  send_mail('Order Confirmed', 'Here is the message.', settings.EMAIL_HOST_USER, ['arfsociety07@gmail.com'])
#     return JsonResponse(res, safe=False)

def send(request, productName, mail):
    res =  send_mail('Order Confirmed', f'Thank you for ordering a product {productName} from Keycodx.com', settings.EMAIL_HOST_USER, [mail])
    return JsonResponse(res, safe=False)



# ______________________Send Email_________________________________