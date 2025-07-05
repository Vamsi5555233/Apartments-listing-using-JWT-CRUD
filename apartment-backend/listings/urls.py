from django.urls import path
from .views import (
    apartment_list, apartment_detail,
    comment_list_create, comment_detail,
    RegisterUser, VerifyEmail,
    ForgotPasswordView, ResetPasswordConfirmView,
)

urlpatterns = [
    path('apartments/', apartment_list),
    path('apartments/<int:pk>/', apartment_detail),
    path('register/', RegisterUser.as_view()),
    path('verify-email/<uidb64>/<token>/', VerifyEmail.as_view(), name='verify-email'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordConfirmView.as_view(), name='reset-password-confirm'),
    path('apartments/<int:apartment_id>/comments/', comment_list_create),
    path('comments/<int:comment_id>/', comment_detail),
]
