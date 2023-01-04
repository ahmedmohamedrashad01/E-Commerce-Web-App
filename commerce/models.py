from django.db import models
from django.utils.html import format_html

from accounts.models import UserAccount

# Create your models here.
class Product(models.Model):
    category = [
        ("Accessories","Accessories"),
        ("Electronics","Electronics"),
        ("Fashion","Fashion"),
        ("Furniture","Furniture"),
        ("Home Appliances","Home Appliances"),
        ("Toys","Toys"),
        ("Others","Others"),

    ]
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=455)
    category = models.CharField(max_length=300, choices=category)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to="media/images/")
    date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)


    def product_image(self):
        return format_html('<img src="{}" width="100">'.format(self.image.url))
    product_image.short_discription = "show images"
    image.allow_tags = True

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-date"]



class Orders(models.Model):
    customer = models.ForeignKey(UserAccount, related_name='orders', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='orders', on_delete=models.CASCADE)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    qty = models.IntegerField(default=1)
    # total = models.DecimalField(max_digits=15, decimal_places=15, default=0)

    def __str__(self):
        return self.customer.email
        # return self.customer.user.email

    def email(self):
        return self.customer.email

    def productName(self):
        return self.product.name

    def productPrice(self):
        return self.product.price

    def productImage(self):
        return self.product.image.url

    def total(self):
        return self.product.price * self.qty


class ShippingAddress(models.Model):
	# customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name="ShippingAddress")
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name="ShippingAddress")
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)

    def __str__(self):
        return self.order