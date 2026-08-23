/**
 * Ticket Sales & Click Tracking Service
 * Tracks real user ticket purchases / clicks per concert ID
 * Persists counts in localStorage and synchronizes across components via events.
 */

const TICKET_SALES_KEY = "eray_mansur_ticket_sales_v1";

export const TicketService = {
  /**
   * Get all ticket sales counts mapped by concert ID
   */
  getAllSales(): Record<string, number> {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(TICKET_SALES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return {};
  },

  /**
   * Get total tickets sold (clicks) for a specific concert ID
   */
  getConcertSales(concertId: string): number {
    const all = this.getAllSales();
    return all[concertId] || 0;
  },

  /**
   * Record a ticket buy click (increments sales counter by 1)
   */
  recordTicketClick(concertId: string): number {
    const all = this.getAllSales();
    const current = all[concertId] || 0;
    const newCount = current + 1;
    all[concertId] = newCount;

    try {
      localStorage.setItem(TICKET_SALES_KEY, JSON.stringify(all));
    } catch {}

    window.dispatchEvent(
      new CustomEvent("ticket-sales-updated", {
        detail: { concertId, newCount, allSales: all }
      })
    );

    return newCount;
  }
};
