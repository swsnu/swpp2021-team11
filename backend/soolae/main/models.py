from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth import get_user_model


User = get_user_model()


class SoolMaterial(models.Model):
    material_image = models.CharField(max_length=100)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SoolMaker(models.Model):
    name = models.CharField(max_length=100)
    official_name = models.CharField(max_length=120)
    ceo_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=120)
    address = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=50)
    report_number = models.CharField(max_length=50)
    maker_image = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SoolTag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SoolCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SoolDistinction(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class TasteStandard(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Anju(models.Model):
    name = models.CharField(max_length=100)
    anju_image = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Sool(models.Model):
    name = models.CharField(max_length=100)
    long_name = models.CharField(max_length=200)
    price = models.PositiveIntegerField()
    sool_image = models.ImageField(upload_to="info_image", blank=True)
    rating = models.IntegerField(default=0)

    alcohol_content = models.DecimalField(max_digits=3, decimal_places=1)
    expire_info = models.CharField(max_length=100)
    storage_note = models.CharField(max_length=100)
    taste_note = models.CharField(max_length=100)
    anju_note = models.CharField(max_length=100)

    content = models.TextField()
    subtext = models.CharField(max_length=300)
    sweet = models.SmallIntegerField()
    weight = models.SmallIntegerField()
    carbonic = models.SmallIntegerField(null=True)
    plain = models.SmallIntegerField()
    acidity = models.SmallIntegerField()
    body = models.SmallIntegerField()
    tannin = models.SmallIntegerField()
    nutty = models.SmallIntegerField()
    richness = models.SmallIntegerField()
    spicy = models.SmallIntegerField()
    bitter = models.SmallIntegerField()
    flavor = models.SmallIntegerField()

    taste_standard = models.ForeignKey(
        TasteStandard, on_delete=CASCADE, related_name="sool"
    )
    sool_category = models.ForeignKey(
        SoolCategory, on_delete=CASCADE, related_name="sool"
    )
    sool_distinction = models.ForeignKey(
        SoolDistinction, on_delete=CASCADE, related_name="sool"
    )
    sool_maker = models.ForeignKey(SoolMaker, on_delete=CASCADE, related_name="sool")
    link = models.TextField(default="")
    sool_material = models.ManyToManyField(SoolMaterial, related_name="sool")
    sool_tag = models.ManyToManyField(SoolTag, related_name="sool")
    anju = models.ManyToManyField(Anju, related_name="sool")

    def update_star_rating(self):
        rating_list = list(
            map(
                lambda x: x["star_rating"], self.sool_review.values("star_rating").all()
            )
        )
        if len(rating_list) == 0:
            self.rating = 0
        else:
            self.rating = sum(rating_list) / len(rating_list)

    def __str__(self):
        return self.name


class Review(models.Model):
    star_rating = models.IntegerField()
    sool = models.ForeignKey(Sool, on_delete=CASCADE, related_name="sool_review")
    title = models.CharField(max_length=50, default="title")
    image = models.ImageField(upload_to="review_image", blank=True, null=True)
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=CASCADE, related_name="review", default=1
    )

    def __str__(self):
        return f"Review of {self.sool}, id:{self.id}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=CASCADE)
    favorite_sool = models.ManyToManyField(Sool, null=True)
    profile_image = models.ImageField(upload_to="review_image", blank=True, null=True)
