from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    UserManager


class MyCustomerManager(BaseUserManager):

    def create_user(self, email, Name, password=None):
        if not email:
            raise ValueError('Users must have an email address.')
        if not Name:
            raise ValueError('Users must have an username.')

        user = self.model(
            email=self.normalize_email(email),
            Name=Name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, Name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            Name=Name,
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Customer(AbstractBaseUser):

    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    Name = models.CharField(max_length=30, unique=True)
    password=models.CharField(max_length=200)
    created_on = models.DateTimeField(verbose_name='created on', auto_now=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['Name','password']

    objects = MyCustomerManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    


class Product(models.Model):
    product=models.CharField(max_length=300)
    prize=models.FloatField()
    img=models.ImageField(null=True,blank=True)
   


    def __str__(self):
        return self.product

class Cart(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    bought=models.CharField(max_length=200,null=True,blank=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)








    
        