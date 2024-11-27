# templatetags/custom_tags.py
from django import template

register = template.Library()

@register.simple_tag
def set_list_element(lst, index, value):
    """Modifie une liste en remplaçant l'élément à 'index' par 'value'."""
    try:
        lst[index] = value
    except IndexError:
        pass  # Gère les index invalides sans erreur
    return lst