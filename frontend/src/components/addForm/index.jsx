import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Error, Form, Input, Label, RadioButton, Select, Textarea, Title, Type } from './addform.styled';
import { addADS } from '../../api/api';

export default function AddForm() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token')
        try {
            await addADS(data, token)
        } catch (error) {
            console.log('Ошибка добавления');
        }
        reset()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Заполните объявление:</Title>

                <Label htmlFor='category'>Выберите раздел:</Label>
                <Select name="category" id="category" defaultValue=""
                    {...register("category", {
                        required: "Выберите что-то одно",
                        validate: (value) =>
                            ["auto", "houses", "electronics"].includes(value) || "Не допустимое значение"
                    })}
                >
                    <option value="" disabled selected>выберите категорию</option>
                    <option value="auto">Машины</option>
                    <option value="houses">Недвижимость</option>
                    <option value="electronics">Электроника</option>
                </Select>
                {errors.category && <Error>{errors.category.message}</Error>}

                <Label htmlFor='selectType'>Тип предложения</Label>
                <Type>
                    <b><RadioButton type="radio" name="appType" value="buy"
                        {...register("appType", {
                            required: "Выберите тип предложения"
                        })} />Куплю</b>
                    <b><RadioButton type="radio" name="appType" value="sell"
                        {...register("appType")}
                    />Продам</b>
                    <b><RadioButton type="radio" name="appType" value="exchange"
                        {...register("appType")}
                    />Обменяю</b>
                </Type>
                {errors.appType && <Error>{errors.appType.message}</Error>}

                <Label htmlFor='name'>Название Товара:</Label>
                <Input type="text" name="title" id="name_tovar"
                    {...register("title", {
                        required: "Поле обязательно к заполнению",
                        minLength: { value: 3, message: "Минимум 3 символа" },
                        maxLength: { value: 30, message: "Максимум 30 символов" }
                    })}
                />
                {errors.title && <Error>{errors.title.message}</Error>}

                <Label htmlFor="description">Описание товара:</Label>
                <Textarea placeholder='Напишите описание'
                    {...register("description", {
                        required: "Обязательное поле",
                        minLength: { value: 6, message: "Минимум 6 символов" },
                        maxLength: { value: 128, message: "Максимум 128 символов" }
                    })}
                ></Textarea>
                {errors.description && <Error>{errors.description.message}</Error>}


                <Label htmlFor="price">Цена товара:</Label>
                <Input type="text" name="price" id="price"
                    {...register("price", {
                        required: "Заполните поле",
                        pattern: { value: /^[0-9]+$/, message: "Введите цену в числах" },
                        minLength: { value: 1, message: "Цена не может быть меньше 1" }
                    })}
                />
                {errors.price && <Error>{errors.price.message}</Error>}

                <Label htmlFor='image'>Ссылка на изображение</Label>
                <Input type='text' name='image' id='image'
                {...register("image", {
                    required: "Вставьте ссылку на изображение",
                    pattern: {value: /^https?:\/\/[^\s/$.?#].[^\s]*$/i, message: "Вставьте именно url на изображение"}
                })}
                />
                {errors.image && <Error>{errors.image.message}</Error>}

                <Button type='submit'>Отправить</Button>
            </Form>
        </>
    )
}
