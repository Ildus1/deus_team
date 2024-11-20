import * as React from 'react';
import { List, Datagrid, TextField, Edit, Create, TextInput, SimpleForm, required, ImageInput, ImageField, FunctionField } from 'react-admin';
import { ColorInput } from 'react-admin-color-picker';

const apiUrl = ''


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const SocialCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название" validate={[required()]} />
            <TextInput className="customWidth" source="descr" label="Описание" validate={[required()]} />
            <TextInput className="customWidth" source="link" label="Ссылка" validate={[required()]} />
            <ColorInput source="color" label="Цвет фона" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Логотип" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
)

export const SocialEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput className="customWidth" source="name" label="Название" validate={[required()]} />
            <TextInput className="customWidth" source="descr" label="Описание" validate={[required()]} />
            <TextInput className="customWidth" source="link" label="Ссылка" validate={[required()]} />
            <ColorInput source="color" label="Цвет фона" validate={[required()]} />
            <ImageInput className="fileInput" placeholder="+" source="image" label="Логотип" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const SocialList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
        </Datagrid>
    </List>
);
