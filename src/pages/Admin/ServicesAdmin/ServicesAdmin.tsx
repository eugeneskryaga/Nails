import { useEffect, useState, type FormEvent } from "react";

import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "../../../services/servicesService";

import type { CreateServiceInput, Service } from "../../../types/service";

import css from "./ServicesAdmin.module.css";
import { Button } from "../../../components/Button/Button";

const initialForm: CreateServiceInput = {
  title: "",
  description: "",
  duration: 30,
  price: 0,
  currency: "€",
  pricePrefix: "",
  durationPrefix: "",
  order: 1,
  isActive: true,
};

export const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [form, setForm] = useState<CreateServiceInput>(initialForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function refreshServices() {
    setLoading(true);

    try {
      setServices(await getAllServices());
    } catch (error) {
      console.error(error);
      setMessage("Unable loading services list.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshServices();
  }, []);

  function updateField<K extends keyof CreateServiceInput>(
    field: K,
    value: CreateServiceInput[K],
  ) {
    setForm(current => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setEditingService(null);
    setForm({
      ...initialForm,
      order: services.length + 1,
    });
  }

  function startEditing(service: Service) {
    setEditingService(service);

    setForm({
      title: service.title,
      description: service.description,
      duration: service.duration,
      price: service.price,
      currency: service.currency,
      pricePrefix: service.pricePrefix ?? "",
      durationPrefix: service.durationPrefix ?? "",
      order: service.order,
      isActive: service.isActive,
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!form.title.trim()) {
      setMessage("Enter service title.");
      return;
    }

    if (!form.description.trim()) {
      setMessage("Enter service description.");
      return;
    }

    if (!Number.isFinite(form.duration) || form.duration <= 0) {
      setMessage("Duration must be more than 0.");
      return;
    }

    if (!Number.isFinite(form.price) || form.price < 0) {
      setMessage("Price cannot be negative.");
      return;
    }

    if (!form.currency.trim()) {
      setMessage("Enter currency.");
      return;
    }

    setSaving(true);

    try {
      if (editingService) {
        await updateService(editingService.id, form);
        setMessage("The service successfully updated.");
      } else {
        await createService(form);
        setMessage("The service successfully created.");
      }

      setEditingService(null);
      setForm(initialForm);

      await refreshServices();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Unable saving service.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: Service) {
    const confirmed = window.confirm(`Remove service «${service.title}»?`);

    if (!confirmed) return;

    setMessage("");
    setDeletingId(service.id);

    try {
      await deleteService(service.id);

      if (editingService?.id === service.id) {
        setEditingService(null);
        setForm(initialForm);
      }

      setServices(current => current.filter(item => item.id !== service.id));

      setMessage("The service removed.");
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error ? error.message : "Unable removing service.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleActive(service: Service) {
    setMessage("");

    try {
      await updateService(service.id, {
        isActive: !service.isActive,
      });

      setServices(current =>
        current.map(item =>
          item.id === service.id ? { ...item, isActive: !item.isActive } : item,
        ),
      );

      setMessage(
        service.isActive
          ? "The service is hidden from the main page."
          : "The service is published on the main page.",
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable changing service status.",
      );
    }
  }

  return (
    <section className={css.adminServices}>
      <h1>Services management</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h2>{editingService ? "Edit service" : "Add service"}</h2>

        <label>
          Service title
          <input
            value={form.title}
            onChange={event => updateField("title", event.target.value)}
            maxLength={120}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={event => updateField("description", event.target.value)}
            maxLength={500}
            rows={3}
            required
          />
        </label>

        <div className={css.fieldsRow}>
          <label>
            Duration, min
            <input
              type="number"
              min="1"
              step="1"
              value={form.duration}
              onChange={event =>
                updateField("duration", Number(event.target.value))
              }
              required
            />
          </label>

          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={event =>
                updateField("price", Number(event.target.value))
              }
              required
            />
          </label>
        </div>

        <div className={css.fieldsRow}>
          <label>
            Currency
            <select
              value={form.currency}
              onChange={event => updateField("currency", event.target.value)}
            >
              <option value="€">EUR (€)</option>
              <option value="₴">UAH (₴)</option>
              <option value="$">USD ($)</option>
            </select>
          </label>

          <label>
            Order
            <input
              type="number"
              step="1"
              value={form.order}
              onChange={event =>
                updateField("order", Number(event.target.value))
              }
              required
            />
          </label>
        </div>

        <div className={css.fieldsRow}>
          <label>
            Price prefix
            <input
              value={form.pricePrefix ?? ""}
              onChange={event => updateField("pricePrefix", event.target.value)}
              placeholder="Example: From"
              maxLength={30}
            />
          </label>

          <label>
            Duration prefix
            <input
              value={form.durationPrefix ?? ""}
              onChange={event =>
                updateField("durationPrefix", event.target.value)
              }
              placeholder="Example: From"
              maxLength={30}
            />
          </label>
        </div>

        <label className={css.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={event => updateField("isActive", event.target.checked)}
          />
          Show services on the main page.
        </label>

        {message && <p role="status">{message}</p>}

        <div className={css.actions}>
          <Button
            type="submit"
            styles="secondary"
            disabled={saving || deletingId !== null}
          >
            {saving
              ? "Saving..."
              : editingService
                ? "Save changes"
                : "Add service"}
          </Button>

          {editingService && (
            <Button
              type="button"
              styles="secondary"
              disabled={saving}
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <h2>All services ({services.length})</h2>

      {loading && <p>Loading services...</p>}

      {!loading && services.length === 0 && (
        <p>
          There is no services yet. Add your first service using the form above.
        </p>
      )}

      <div className={css.services}>
        {services.map(service => (
          <article
            className={css.service}
            key={service.id}
          >
            <div className={css.serviceInfo}>
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <p>
                {service.durationPrefix ? `${service.durationPrefix} ` : ""}
                {service.duration} min
                {" · "}
                {service.pricePrefix ? `${service.pricePrefix} ` : ""}
                {service.price} {service.currency}
              </p>

              <p>
                Status: {service.isActive ? "Active" : "Hidden"}
                {" · "}
                Order: {service.order}
              </p>
            </div>

            <div className={css.actions}>
              <Button
                type="button"
                styles="secondary"
                disabled={saving || deletingId !== null}
                onClick={() => startEditing(service)}
              >
                Edit
              </Button>

              <Button
                type="button"
                styles="secondary"
                disabled={saving || deletingId !== null}
                onClick={() => void handleToggleActive(service)}
              >
                {service.isActive ? "Hide" : "Publish"}
              </Button>

              <Button
                type="button"
                styles="secondary"
                disabled={saving || deletingId !== null}
                onClick={() => void handleDelete(service)}
              >
                {deletingId === service.id ? "Removing..." : "Remove"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
