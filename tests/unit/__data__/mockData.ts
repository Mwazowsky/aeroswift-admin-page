import { vi } from "vitest";
import { ICar } from "../../content/applications/Products/products.types";
import { IFileItem, IMeta } from "src/services/types";

export const productsHooksMockedData = {
  cars: [
    {
      available: true,
      availableAt: "2023-12-08T17:00:00.000Z",
      capacity: 4,
      car_id: 1,
      created_at: "2023-12-09T09:05:20.986Z",
      created_by: 2,
      description: "Test Car",
      image:
        "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
      manufacture: "Test Car",
      model: "Test Car",
      options: {
        optionsInputFields: [
          {
            option: "Test Car",
          },
        ],
      },
      plate: "Test Car",
      rentPerDay: "10000000",
      specs: {
        specsInputFields: [
          {
            spec: "Test Car",
          },
        ],
      },
      transmission: "Test Car",
      type: "Test Car",
      updated_at: null,
      updated_by: 2,
      year: 2020,
    },
    {
      available: true,
      availableAt: "2023-12-08T17:00:00.000Z",
      capacity: 4,
      car_id: 1012,
      created_at: "2023-12-09T09:05:20.986Z",
      created_by: 2,
      description: "Test Car",
      image:
        "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
      manufacture: "Test Car",
      model: "Test Car",
      options: {
        optionsInputFields: [
          {
            option: "Test Car",
          },
        ],
      },
      plate: "Test Car",
      rentPerDay: "10000000",
      specs: {
        specsInputFields: [
          {
            spec: "Test Car",
          },
        ],
      },
      transmission: "Test Car",
      type: "Test Car",
      updated_at: null,
      updated_by: 2,
      year: 2020,
    },
    {
      available: true,
      availableAt: "2023-12-08T17:00:00.000Z",
      capacity: 4,
      car_id: 121,
      created_at: "2023-12-09T09:05:20.986Z",
      created_by: 2,
      description: "Test Car",
      image:
        "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
      manufacture: "Test Car",
      model: "Test Car",
      options: {
        optionsInputFields: [
          {
            option: "Test Car",
          },
        ],
      },
      plate: "Test Car",
      rentPerDay: "10000000",
      specs: {
        specsInputFields: [
          {
            spec: "Test Car",
          },
        ],
      },
      transmission: "Test Car",
      type: "Test Car",
      updated_at: null,
      updated_by: 2,
      year: 2020,
    },
  ] as ICar[],
  filters: { status: "all" },
  params: {
    page: 1,
    size: 10,
  },
  loading: false,
  meta: {
    page: 1,
    size: 10,
    totalData: 2,
    totalPages: 0,
  } as IMeta,
  setParams: vi.fn(),
  handleStatusChange: vi.fn(),
  handleEdit: vi.fn(),
  handleRemove: vi.fn(),
  handleRemoveMultiple: vi.fn(),
  handleSearch: vi.fn(),
};

export const detailsHooksMockedData = {
  car: {
    available: true,
    availableAt: "2023-12-08T17:00:00.000Z",
    capacity: 4,
    car_id: 1,
    created_at: "2023-12-09T09:05:20.986Z",
    created_by: 2,
    description: "Test Car",
    image:
      "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
    manufacture: "Test Car",
    model: "Test Car",
    options: {
      optionsInputFields: [
        {
          option: "Test Car",
        },
      ],
    },
    plate: "Test Car",
    rentPerDay: "10000000",
    specs: {
      specsInputFields: [
        {
          spec: "Test Car",
        },
      ],
    },
    transmission: "Test Car",
    type: "Test Car",
    updated_at: null,
    updated_by: 2,
    year: 2020,
  } as ICar,
  optionsInputFields: [
    {
      option: 'Test Car'
    }
  ],
  specsInputFields: [
    {
      spec: 'Test Car'
    }
  ],
  setCar: vi.fn(),
  fetchCarData: vi.fn()
};

export const formHooksMockedData = {
  formValues: {
    car_id: 69,
    plate: "Test Car",
    manufacture: "Test Car",
    image: "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
    model: "Test Car",
    type: "Test Car",
    description: "Test Car",
    transmission: "Test Car",
    capacity: 4,
    rentPerDay: "100000",
    availableAt: "2023-12-08T17:00:00.000Z",
    available: false,
    year: 2020,
    options: {
      optionsInputFields: [
        {
          option: "Test Car",
        },
      ],
    },
    specs: {
      specsInputFields: [
        {
          spec: "Test Car",
        },
      ],
    },
    created_by: 2,
    updated_by: 2
  },
  loadingCover: false,
  loadingSubmit: false,
  fileItem: {
    url: "http://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
    secure_url: "https://res.cloudinary.com/ddpriosuk/image/upload/v1702112719/jlrvld42rjaoofkk4pia.png",
    width: 200,
    height: 200,
    resourceType: 'image/png'
  },
  optionsInputFields: [],
  specsInputFields: [],
  fetchCarData: vi.fn(),
  handleSubmit: vi.fn(),
  handleUploadCover: vi.fn(),
  setFormValues: vi.fn(),
  handleOptionsFormChange: vi.fn(),
  handleSpecsFormChange: vi.fn(),
  addOptionFields: vi.fn(),
  addSpecFields: vi.fn()
}