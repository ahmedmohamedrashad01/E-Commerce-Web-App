# from ast import Import
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from .views import ProductViewSets, OrdersViewSets, ShippingViewSets,UserAccountViewSets, send
router = DefaultRouter()
router.register('products', ProductViewSets, basename='products')
router.register('cart', OrdersViewSets, basename='cart')
# router.register('customers', CustomerViewSets, basename='customers')
router.register('ship', ShippingViewSets, basename='ship')
router.register('us', UserAccountViewSets, basename='us')


urlpatterns = [
path('api/', include(router.urls)),

# path('send/', send, name="send"),
path('send/<str:productName>/<str:mail>', send, name="send"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)