from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from .serializers import CustomerSerializer,ProductSerializer,CartSerializer,CustomerRegisterSerializer
from rest_framework import permissions
from .models import Customer,Product,Cart
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.views import APIView

# Create your views here.
class CustomerRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request):
        a={
            "Name":request.data['Name'],
            "email":request.data['email'],
            "password":request.data['password']
        }
        register=CustomerRegisterSerializer(data=a)

        C=Customer.objects.filter(Name__iexact=request.data['Name'])
        C1=Customer.objects.filter(email__iexact=request.data['email'])
        co=C.count()
        co1=C1.count()
        print(co)
        if co!=0:
            print(C)
            return Response({'response':"Username is taken"})
        elif co1!=0:
            print(C1)
            return Response({'response':'email already exists'})
        else:
            if register.is_valid():
                print(a)
                register.create(a)
            
                
            else:
                data=register.errors
            
            return Response(register.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def ProductList(request):
    products=Product.objects.all()
    print(products)
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ProductDetail(request,pk):
    product=Product.objects.get(id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def CustomerDetail(request,pk):
    product=Customer.objects.get(id=pk)
    serializer=CustomerSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def CustomerList(request):
    product=Customer.objects.all()
    serializer=CustomerSerializer(product,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def CustomerLogin(request,email,password):
    product=Customer.objects.filter(email__iexact=email ).values('password','Name')

    a=product[0]
    
    
    if(product.count()==1 and a['password']==password):

        data={
            "response":"success",
            "Name":a['Name']

        }
        print("a")
    else:
        data={
            "response":"failure"
        }
    
        
  
    return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def CartCreate(request):
    serializer=CartSerializer(data=request.data)
    if serializer.is_valid():   
        serializer.save()
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def CartList(request):
    product=Cart.objects.all()
    serializer=CartSerializer(product,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def CartListName(request,name):
    customer=Customer.objects.get(Name=name)
    id1=customer.id
    cart=Cart.objects.filter(customer=id1)
    i=cart.count()
    id2=[]
    idCart=[]
    for x in range(i):
        id2.append(cart[x].product_id)
        idCart.append(cart[x].id)
    productName=Product.objects.filter(id__in=id2)
    
    serializer=ProductSerializer(productName,many=True)
    serializer1=CartSerializer(cart,many=True)
    
    api=[
        serializer.data,
        serializer1.data
    ]
    return Response(api)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def CartDelete(request,pk):
    product=Cart.objects.get(id=pk)
    product.delete()

class ObtainAuthTokenView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        context = {}

        email = request.data['username']
        password = request.data['password']
        print(email)
        print(request.data)



        account = authenticate(email=email, password=password)
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            context['response'] = 'Successfully authenticated.'
            context['pk'] = account.pk
            context['Name'] = account.Name
            context['token'] = token.key
        else:

            context['response'] = 'Error'
            context['error_message'] = 'Invalid credentials'

        return Response(context)





