
from django.shortcuts import render
from users.models import User
from django.views.generic import ListView
from django.utils import translation
from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied


def Home(request):
	return render(request, 'home.html')

class HomeView(ListView):
    model = User
    template_name = "core/match.html"
    context_object_name = "match"
    paginate_by = 10
    ordering = "pk"
    # new method added ⬇️
    def get_template_names(self, *args, **kwargs):
        if self.request.htmx:
            return "core/match-list.html"
        else:
            return self.template_name
        
def custom_page_not_found_view(request, exception):
    return render(request, '404.html', status=404)


@login_required
def my_protected_view(request):
    return render(request, 'protected_page.html')

def my_restricted_view(request):
    if not request.user.has_perm('app_name.can_view_page'):
        raise PermissionDenied
    return render(request, 'restricted_page.html')

def custom_permission_denied_view(request, exception=None):
    return render(request, '403.html', status=403)
