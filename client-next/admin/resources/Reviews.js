import React from 'react';
import {List, Datagrid, TextField, EditButton, SelectArrayInput} from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, AutocompleteArrayInput, ImageField, FunctionField, FileInput, FileField, ReferenceArrayInput, SelectInput } from 'react-admin';

const apiUrl = ''


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                console.log(record);
                if (record.filename) {
                    return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const ReviewsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const ReviewsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Компания" />
            <TextInput className="customWidth" source="service" label="Услуга" />
            <TextInput className="customWidth" source="type" label="Тип услуги" />
            <FileInput source="reviewFile" label="Файл отзыва">
                <FileField source="src" title="title" />
            </FileInput>
            <TextInput className="customWidth" source="reviewName" label="Имя человека оставившего отзыв" />
            <TextInput className="customWidth" source="reviewPost" label="Пост человека оставившего отзыв" />
            <ImageInput className="fileInput" placeholder="+" source="reviewImage" label="Фото человека оставившего отзыв" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput className="customWidth" source="review" label="Отзыв" fullWidth/>
            <ReferenceArrayInput  source="reviewProject" reference="projects" perPage={100000000000}>
                <AutocompleteArrayInput className="customWidth" optionText="name" label="Проект"  filterToQuery={searchText => ({ name: searchText })}/>
            </ReferenceArrayInput>

            <ReferenceArrayInput source="reviewService" reference="services" perPage={100000000000} allowEmpty={true}>
                <AutocompleteArrayInput className="customWidth" optionText="name" label="Услуга" />
            </ReferenceArrayInput>
            <ImageInput className="fileInput" placeholder="+"  source="reviewBg" label="Фото отзывa" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const ReviewsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Компания" />
            <TextInput className="customWidth" source="service" label="Услуга" />
            <TextInput className="customWidth" source="type" label="Тип услуги" />
            <FileInput source="reviewFile" label="Файл отзыва">
                <FilenameField source="src" title="title" />
            </FileInput>
            <TextInput className="customWidth" source="reviewName" label="Имя человека оставившего отзыв" />
            <TextInput className="customWidth" source="reviewPost" label="Пост человека оставившего отзыв" />
            <ImageInput className="fileInput" placeholder="+" source="reviewImage" label="Фото человека оставившего отзыв" accept="image/*">
                <FilenameField source="src" title="title" />
            </ImageInput>
            <TextInput className="customWidth" source="review" label="Отзыв" />
            <ReferenceArrayInput  source="reviewProject" reference="projects" perPage={100000000000}>
                <AutocompleteArrayInput className="customWidth" optionText="name" label="Проект" filterToQuery={searchText => ({ name: searchText })}/>
            </ReferenceArrayInput>

            <ReferenceArrayInput source="reviewService" reference="services" perPage={100000000000} allowEmpty={true}>
                <AutocompleteArrayInput className="customWidth" optionText="name" label="Услуга" />
            </ReferenceArrayInput>

            <ImageInput className="fileInput" placeholder="+" source="reviewBg" label="Фото отзывa" accept="image/*">
                <FilenameField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);