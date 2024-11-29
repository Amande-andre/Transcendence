
from django.shortcuts import render
from users.models import User
from django.views.generic import ListView

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