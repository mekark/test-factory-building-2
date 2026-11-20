"use client";

import { ChangeEvent, FormEvent, useState } from "react";

// Shared by every Figma enquiry form (hero + call-to-action): same seven
// fields, same validation, same API route and thank-you redirect.

const FORM_ENDPOINT = "/api/enquiry-form";
const THANK_YOU_URL = "/thank-you";

export const INDUSTRY_TYPES = [
 "Automotive, EV & Auto Components",
  "Engineering, Machinery & Heavy Manufacturing",
  "Electronics, Electrical & Semiconductor",
  "Food, Beverage & FMCG",
  "Pharmaceutical, Chemical & Life Sciences",
  "Textile, Apparel & Leather",
  "Metals, Steel & Building Materials",
  "Plastics, Packaging & Consumer Products",
  "Renewable Energy & Clean-Tech Manufacturing",
  "Others",
];

export const SQFT_OPTIONS = [
  "10,000 - 20,000 Sq.ft",
  "20,000 - 30,000 Sq.ft",
  "30,000 - 50,000 Sq.ft",
  "50,000+ Sq.ft",
];

export type EnquiryValues = {
  name: string;
  projectLocation: string;
  phoneNumber: string;
  email: string;
  industryType: string;
  sqft: string;
  requirements: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const INITIAL_VALUES: EnquiryValues = {
  name: "",
  projectLocation: "",
  phoneNumber: "",
  email: "",
  industryType: "",
  sqft: "",
  requirements: "",
};

// Letters (any language), spaces and a few name punctuation marks; no digits.
const NAME_ALLOWED = /[^\p{L}\p{M}\s.'-]/gu;
const LOCATION_ALLOWED = /[^\p{L}\p{M}\s.,'&/()-]/gu;
const NAME_VALID = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const LOCATION_VALID = /^[\p{L}\p{M}][\p{L}\p{M}\s.,'&/()-]*$/u;
const EMAIL_VALID =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

const PHONE_LENGTH = 10;

// Cleans a value as the user types or pastes, so invalid characters never land in the field.
const sanitize = (name: string, value: string): string => {
  switch (name) {
    case "name":
      return value.replace(NAME_ALLOWED, "").replace(/^\s+/, "").slice(0, 60);
    case "projectLocation":
      return value.replace(LOCATION_ALLOWED, "").replace(/^\s+/, "").slice(0, 80);
    case "phoneNumber": {
      // Pasted numbers like "+91 98765 43210" or "098765 43210" lose their country / trunk prefix.
      let digits = value.replace(/\D/g, "");
      if (digits.length > PHONE_LENGTH && digits.startsWith("91")) digits = digits.slice(2);
      else if (digits.length > PHONE_LENGTH && digits.startsWith("0")) digits = digits.slice(1);
      return digits.slice(0, PHONE_LENGTH);
    }
    case "email":
      return value.replace(/\s/g, "").slice(0, 80);
    default:
      return value;
  }
};

const validate = (values: EnquiryValues): EnquiryErrors => {
  const errors: EnquiryErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Name is required";
  else if (name.length < 2 || !NAME_VALID.test(name))
    errors.name = "Enter a valid name (letters only)";

  const location = values.projectLocation.trim();
  if (location && (location.length < 2 || !LOCATION_VALID.test(location)))
    errors.projectLocation = "Enter a valid location (letters only)";

  if (!values.phoneNumber) {
    errors.phoneNumber = "Mobile number is required";
  } else if (values.phoneNumber.length !== PHONE_LENGTH) {
    errors.phoneNumber = "Enter a 10-digit mobile number";
  }

  if (!values.industryType) errors.industryType = "Select industry type";
  if (!values.sqft) errors.sqft = "Select project sq. ft";

  const email = values.email.trim();
  if (email && !EMAIL_VALID.test(email)) errors.email = "Enter a valid email address";

  return errors;
};

export function useEnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: sanitize(name, value) }));
    setErrors((current) => {
      if (!current[name as keyof EnquiryValues]) return current;
      const next = { ...current };
      delete next[name as keyof EnquiryValues];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Same payload shape as the original enquiry form; "service" carries the industry type.
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phoneNumber.trim(),
          location: values.projectLocation.trim(),
          company: "",
          sqf: values.sqft,
          startTimeline: "",
          budget: "",
          message: values.requirements.trim(),
          service: values.industryType,
          sourceUrl: window.location.href,
          pageUrl: window.location.href,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            "We could not submit your enquiry right now. Please try again.",
        );
      }

      setValues(INITIAL_VALUES);
      window.location.assign(THANK_YOU_URL);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not submit your enquiry right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, submitError, isSubmitting, handleChange, handleSubmit };
}
