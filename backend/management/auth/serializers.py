from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class JWTLoginSerializer(TokenObtainPairSerializer):
    """
    The only purpose of this serializer is to add custom claims
    to the JWT generated on login.
    Reference: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.first_name
        return token