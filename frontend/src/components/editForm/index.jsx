import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Error, Form, Input, Label, Textarea, Title,} from './EditForm.styled';
import { editAds, getAd } from '../../api/api';
import { useNavigate, useParams } from 'react-router';

export default function EditForm() {
    const { id } = useParams()
    const nav = useNavigate()
    const [adId, setAdId] = useState(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const token = localStorage.getItem('token')

        const fetchAd = async () => {
            try {
                const data = await getAd(token, id)
                reset(data.message)
                setAdId(data.message.id)
            } catch (error) {
                
            }
        }

        fetchAd()
    }, [reset])

    const onSubmit = async (data) => {
        await editAds(data, id)
        nav(`/main/ads/${id}`)
    }


    if (id != adId) {
        return <div>Объявление не доступно!</div>
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Редактирование объявления:</Title>
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

                <Button type='submit'>Редактировать</Button>
            </Form>
        </>
    )
}
