import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl =`/api`;

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { q, ...filters } = params.filter; // оставляем только фильтры, не связанные с полем q (поисковый запрос)
    const query = {
      ...filters,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _limit: perPage,
      _fields: params.fields // добавляем параметр fields
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({headers, json}) => {
      console.log(headers.get("content-range"))
      return {
        data: json,
        total: parseInt(headers.get("content-range").split("/").pop(), 10)
      }
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids.map(id => id).join(','),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _limit: perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json,
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    });
  },

  create: (resource, params) => {
    const formData = new FormData();
    const images = [
      "image",
      "imageMob",
      "mainNewsImage",
      "file",
      "descrImg",
      "mainImg",
      "bannerFirst",
      "bannerSecond",
      "bannerThird",
      "bannerFourth",
      "bannerFifth",
      "video",
      "reviewFile",
      "reviewImage",
      "reviewBg",
      "mainVideoFile",
      "mainMobVideoFile",
      "presentation",
      'img',
      'visibilityImg1',
      'visibilityImg2',
      'headerPhoto',
      'contactPhoto',
    ];
    const arrayImages = ['imagesExtra', 'bannerSeconds', 'bannerThirds', 'bannerFourths' , 'bannerFifths', 'photoSlider', 'formFiles' ]
    const arrayApproachKeys = ['approachList', 'approachListSecond', 'approachListThird']
    const jsonKeys = ['tasksList', 'textList', 'reviewProject', 'metrics', 'stack', 'reviewService', 'workSteps','tariffs','work','benefits','subProjects']
    let hasImage = false;
    console.log(params.data)
    for (const [key, value] of Object.entries(params.data)) {
      if (images.includes(key) && value) {
        hasImage = true;
        formData.append(key, value.rawFile);
      } else if (arrayImages.includes(key) && value) {

        const imagesFile = !!value
          ? value.map((image) => (!!image.imageI ? image.imageI.rawFile : image.filename))
          : [];
        // добавляем картинки из arrayImages в formData
        console.log('imagesFile',imagesFile)
        imagesFile.forEach((image, index) => {
          formData.append(key, image);
        });
        //свойства в которых объект нужно отдельно переводить в JSON
      } else if (key ==='workSteps' && value) {
        const newValue = value.map(workStep => {
          workStep.imageI = workStep.imageI.rawFile ? workStep.imageI.rawFile : true
          return workStep
        });
        formData.append(key,  JSON.stringify(newValue));
        //свойства в которых объект нужно отдельно переводить в JSON
      } else if (jsonKeys.includes(key) && !!value){
        formData.append(key, JSON.stringify(value));
      } else if (arrayApproachKeys.includes(key) && value) {
        const imagesFile = !!value
            ? value.map((image) => !!image.imageI ? image.imageI.rawFile : null)
            : [];

        // добавляем картинки из arrayImages в formData
        imagesFile.forEach((image, index) => {
          formData.append(key+'Files', image);
        });
        formData.append(key, JSON.stringify(value));
      } else {
        console.log(key, value);
        formData.append(key, value);
      }
    }
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: hasImage ? formData : JSON.stringify(params.data),
    }).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
  },

  update: (resource, params) => {
    const formData = new FormData();
    const images = ['image', 'imageMob', 'mainNewsImage',"file", "descrImg", 'mainImg', 'bannerFirst', 'bannerSecond', 'bannerThird', 'bannerFourth', 'bannerFifth', 'video', 'reviewFile', 'reviewImage', 'reviewBg', 'mainVideoFile', 'mainMobVideoFile', 'presentation', 'img', 'visibilityImg1', 'visibilityImg2', 'headerPhoto', 'contactPhoto'];
    const arrayImages = ['imagesExtra', 'bannerSeconds', 'bannerThirds', 'bannerFourths' , 'bannerFifths', 'photoSlider', 'formFiles']
    const arrayApproachKeys = ['approachList', 'approachListSecond', 'approachListThird']
    const jsonKeys = ['tasksList', 'textList', 'reviewProject', 'metrics', 'stack', 'reviewService', 'workSteps','tariffs','work','benefits','subProjects']
    let hasImage = false; // флаг, указывающий на наличие картинки в параметрах запроса
    console.log(params.data);
    const workStepsImages = []

    for (const [key, value] of Object.entries(params.data)) {
      console.log('put',key, value);
      if (images.includes(key) && value) {

        hasImage = true;
        if(value.rawFile) {
          formData.append(key, value.rawFile);
        } else {
          formData.append(key, true);
        }
      } else {
        if (key === "awardProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`awardProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else if (key === 'diplomaProject') {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`diplomaProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else if (key === "raitingProject") {
          value.forEach((item, index) => {
            Object.keys(item).forEach((itemKey) => {
              formData.append(`raitingProject[${index}][${itemKey}]`, item[itemKey]);
            });
          });
        } else if (key === 'workSteps' && value) {
          hasImage = true;
          const newValue = value.map(workStep => {
            workStep.imageI = workStep.imageI?.rawFile ? workStep.imageI?.rawFile : true
            if (!!workStep.imageI.path) {
              workStepsImages.push(workStep.imageI)
            }

            return workStep
          });
          formData.append(key, JSON.stringify(newValue));
          //свойства в которых объект нужно отдельно переводить в JSON
        } else if (arrayImages.includes(key) && value) {
          const images = !!value
            ? value.map((image) => (!!image.imageI ? image.imageI.rawFile : null )).filter(v1 =>!!v1)
            : [];
          const imagesNames = !!value
            ? value.map((image) => (!!image.imageI ? null : image.filename)).filter(v1 =>!!v1)
            : [];

          // добавляем картинки из arrayImages в formData
          images.forEach((image, index) => {
            if (image !== undefined) {
              formData.append(key, image);
            }
          });
          formData.append(key+'Names', JSON.stringify(imagesNames));
          //свойства в которых объект нужно отдельно переводить в JSON
        } else if (jsonKeys.includes(key) && !!value){
          formData.append(key, JSON.stringify(value));
        } else if (arrayApproachKeys.includes(key) && value) {
            const imagesFile = !!value
                ? value.map((image) => !!image.imageI ? image.imageI.rawFile : null)
                : [];
            // добавляем картинки из arrayImages в formData
            imagesFile.forEach((image, index) => {
                formData.append(key+'Files', image);
            });
            formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    }

    // добавляем картинки из arrayImages в formData
    workStepsImages.forEach((image, index) => {
      if (image !== undefined) {
        formData.append('workStepsImages', image);
      }
    });

    const url = `${apiUrl}/${resource}/${params.id}`;

    const options = {
      method: "PUT",
      body: hasImage ? formData : JSON.stringify(params.data),
    };
    console.log(params.data)
    return httpClient(url, options).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    const query = {
      id: params.ids.join(','),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, {
      method: 'PATCH',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const requests = params.ids.map(id =>
      httpClient(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      })
    );
    return Promise.all(requests).then(responses => ({
      data: responses.map(({ json }) => json),
    }));
  },
};

export default dataProvider;