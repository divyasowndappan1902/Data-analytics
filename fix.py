import re

with open("dashboard-customer.html", "r", encoding="utf-8") as f:
    content = f.read()

# We need to find where the corruption starts. 
# We'll look for `<div class="chart-header" style="padding: 0 1.5rem;">` 
# which is the "Recent Queries" section.
# We will replace everything from that point until the Reports section:
# `<!-- Reports Section -->`

pattern = r'<div class="chart-header" style="padding: 0 1.5rem;">.*?<!-- Reports Section -->'
replacement = """<div class="chart-header" style="padding: 0 1.5rem;">
                        <h3>Recent Queries</h3>
                    </div>
                    <table class="dash-table">
                        <thead>
                            <tr>
                                <th>Query Name</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Q3 Sales Aggregation</td>
                                <td>2.4s</td>
                                <td><span class="status-badge status-active">Success</span></td>
                            </tr>
                            <tr>
                                <td>User Retention Cohort</td>
                                <td>14.1s</td>
                                <td><span class="status-badge status-active">Success</span></td>
                            </tr>
                            <tr>
                                <td>Inventory Sync</td>
                                <td>--</td>
                                <td><span class="status-badge status-pending">Running</span></td>
                            </tr>
                            <tr>
                                <td>Marketing ROI Export</td>
                                <td>1.1s</td>
                                <td><span class="status-badge status-active">Success</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Extra Analytics Content -->
            <div class="dash-chart-row" style="margin-top: 2rem;">
                <div class="table-card" style="flex: 2;">
                    <div class="chart-header">
                        <h3>Top API Endpoints</h3>
                    </div>
                    <table class="dash-table">
                        <thead>
                            <tr>
                                <th>Endpoint</th>
                                <th>Requests</th>
                                <th>Error Rate</th>
                                <th>Avg Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>/api/v1/users/profile</td>
                                <td>452,100</td>
                                <td>0.01%</td>
                                <td>24ms</td>
                            </tr>
                            <tr>
                                <td>/api/v1/data/sync</td>
                                <td>214,550</td>
                                <td>0.05%</td>
                                <td>112ms</td>
                            </tr>
                            <tr>
                                <td>/api/v1/auth/token</td>
                                <td>189,000</td>
                                <td>0.00%</td>
                                <td>18ms</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table-card" style="flex: 1; padding: 1.5rem;">
                    <div class="chart-header">
                        <h3 style="margin-bottom: 1rem;">Recent Alerts</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; gap: 1rem; align-items: flex-start; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; margin-top: 6px;"></div>
                            <div>
                                <h5 style="margin:0; color:#f8fafc; font-size:0.9rem;">Usage Warning</h5>
                                <p style="margin:0; color:#94a3b8; font-size:0.8rem;">Approaching 80% of API limit</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; margin-top: 6px;"></div>
                            <div>
                                <h5 style="margin:0; color:#f8fafc; font-size:0.9rem;">System Update</h5>
                                <p style="margin:0; color:#94a3b8; font-size:0.8rem;">v2.4 successfully deployed</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: #ef4444; margin-top: 6px;"></div>
                            <div>
                                <h5 style="margin:0; color:#f8fafc; font-size:0.9rem;">Payment Failed</h5>
                                <p style="margin:0; color:#94a3b8; font-size:0.8rem;">Last invoice could not be processed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- New Analytics Sections -->
            <div class="dash-chart-row" style="margin-top: 2rem;" data-aos="fade-up">
                
                <!-- Storage & Data Transfer Usage -->
                <div class="table-card" style="flex: 1; padding: 1.5rem;">
                    <div class="chart-header">
                        <h3 style="margin-bottom: 1rem;">Storage & Transfer</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color:#f8fafc;">
                                <span>Blob Storage</span>
                                <span>45 GB / 100 GB</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow:hidden;">
                                <div style="width: 45%; height: 100%; background: #38bdf8;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color:#f8fafc;">
                                <span>Data Transfer (Egress)</span>
                                <span>120 GB / 500 GB</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow:hidden;">
                                <div style="width: 24%; height: 100%; background: #10b981;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color:#f8fafc;">
                                <span>Database Storage</span>
                                <span>8.5 GB / 10 GB</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow:hidden;">
                                <div style="width: 85%; height: 100%; background: #f59e0b;"></div>
                            </div>
                            <p style="margin: 0.5rem 0 0 0; color: #f59e0b; font-size: 0.75rem;">Warning: Approaching limit</p>
                        </div>
                    </div>
                </div>

                <!-- Geographical Traffic -->
                <div class="table-card" style="flex: 1;">
                    <div class="chart-header">
                        <h3>Geographical Traffic</h3>
                    </div>
                    <table class="dash-table">
                        <thead>
                            <tr>
                                <th>Region</th>
                                <th>Requests</th>
                                <th>Avg Latency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>United States (US East)</td>
                                <td>45%</td>
                                <td>42ms</td>
                            </tr>
                            <tr>
                                <td>Europe (Frankfurt)</td>
                                <td>30%</td>
                                <td>85ms</td>
                            </tr>
                            <tr>
                                <td>Asia Pacific (Tokyo)</td>
                                <td>15%</td>
                                <td>110ms</td>
                            </tr>
                            <tr>
                                <td>South America (São Paulo)</td>
                                <td>10%</td>
                                <td>145ms</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            </div> <!-- End Overview Section -->

            <!-- Reports Section -->"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("dashboard-customer.html", "w", encoding="utf-8") as f:
    f.write(new_content)
print("done")
