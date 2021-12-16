# Generated by Django 4.0 on 2021-12-15 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('main', '0008_alter_sool_carbonic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='review_image'),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='review_image')),
                ('favorite_sool', models.ManyToManyField(null=True, to='main.Sool')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
        ),
    ]