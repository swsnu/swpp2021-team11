# Generated by Django 3.2.8 on 2021-11-04 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anju',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('anju_image', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SoolCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SoolDistinction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SoolMaker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('official_name', models.CharField(max_length=120)),
                ('ceo_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=120)),
                ('address', models.CharField(max_length=200)),
                ('registration_number', models.CharField(max_length=50)),
                ('report_number', models.CharField(max_length=50)),
                ('maker_image', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SoolMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('material_image', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SoolTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TasteStandard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Sool',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('long_name', models.CharField(max_length=200)),
                ('star_rating', models.DecimalField(decimal_places=2, max_digits=4)),
                ('price', models.PositiveIntegerField()),
                ('sool_image', models.CharField(max_length=100)),
                ('alcohol_content', models.DecimalField(decimal_places=1, max_digits=3)),
                ('expire_info', models.CharField(max_length=100)),
                ('storage_note', models.CharField(max_length=100)),
                ('taste_note', models.CharField(max_length=100)),
                ('anju_note', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('subtext', models.CharField(max_length=300)),
                ('sweet', models.SmallIntegerField()),
                ('weight', models.SmallIntegerField()),
                ('carbonic', models.SmallIntegerField()),
                ('plain', models.SmallIntegerField()),
                ('acidity', models.SmallIntegerField()),
                ('body', models.SmallIntegerField()),
                ('tannin', models.SmallIntegerField()),
                ('nutty', models.SmallIntegerField()),
                ('richness', models.SmallIntegerField()),
                ('spicy', models.SmallIntegerField()),
                ('bitter', models.SmallIntegerField()),
                ('flavor', models.SmallIntegerField()),
                ('anju', models.ManyToManyField(related_name='sool', to='main.Anju')),
                ('sool_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sool', to='main.soolcategory')),
                ('sool_distinction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sool', to='main.sooldistinction')),
                ('sool_maker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sool', to='main.soolmaker')),
                ('sool_material', models.ManyToManyField(related_name='sool', to='main.SoolMaterial')),
                ('sool_tag', models.ManyToManyField(related_name='sool', to='main.SoolTag')),
                ('taste_standard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sool', to='main.tastestandard')),
            ],
        ),
    ]
