from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

from api.views import(
    ObtainAuthTokenView,
    CustomerRegister
)




urlpatterns=[
    
    path('ProductList/',views.ProductList,name="ProductList"),
    path('ProductDetail/<str:pk>/',views.ProductDetail,name="ProductDetail"),
    path('CustomerDetail/<str:pk>/',views.CustomerDetail,name="CustomerDetail"),
    path('CartCreate/',views.CartCreate,name="CartCreate"), 
    path('CartListName/<str:name>/',views.CartListName,name="CartListName"),
    path('CartList/',views.CartList,name="CartList"),
    path('CustomerList/',views.CustomerList,name="CustomerList"),
    path('CartDelete/<str:pk>',views.CartDelete,name="CartDelete"),   
    path('CustomerRegister/',CustomerRegister.as_view(),name="CustomerRegister"), 
    path('login', ObtainAuthTokenView.as_view(),name="CustomerLogin"),
    
  
]